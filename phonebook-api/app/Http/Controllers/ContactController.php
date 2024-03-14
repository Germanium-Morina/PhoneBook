<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Email;
use App\Models\PhoneNumber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::all();
        return response()->json($contacts);
    }

    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string',
            'last_name' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'country' => 'required|string',
            'emails.*' => 'required|email',
            'phone_numbers.*' => 'required|string',
        ]);

        // Start a database transaction
        DB::beginTransaction();

        try {
            // Create a new contact
            $contact = Contact::create([
                'name' => $validatedData['name'],
                'last_name' => $validatedData['last_name'],
                'address' => $validatedData['address'],
                'city' => $validatedData['city'],
                'country' => $validatedData['country'],
            ]);

            // Create email records
            foreach ($validatedData['emails'] as $email) {
                $emailModel = new Email(['email' => $email]);
                $contact->emails()->save($emailModel);
            }

            // Create phone number records
            foreach ($validatedData['phone_numbers'] as $phoneNumber) {
                $phoneNumberModel = new PhoneNumber(['phone_number' => $phoneNumber]);
                $contact->phoneNumbers()->save($phoneNumberModel);
            }

            // Commit the transaction
            DB::commit();

            // Return the created contact
            return response()->json($contact, 201);
        } catch (\Exception $e) {
            // Rollback the transaction on error
            DB::rollBack();

            // Log the error
            logger()->error($e);

            // Return an error response
            return response()->json(['message' => 'Failed to create contact.'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $contact = Contact::findOrFail($id);
        $contact->update($request->all());

        if ($contact->wasChanged()) {
            return response()->json(['message' => 'Contact updated successfully'], 200);
        } else {
            return response()->json(['message' => 'No changes were made to the contact'], 200);
        }
    }

    public function destroy($id)
    {
        $contact = Contact::find($id);

        if ($contact) {
            $contact->delete();
            return response()->json(['message' => 'Contact deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'Contact not found'], 404);
        }
    }

}

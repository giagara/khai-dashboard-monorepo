<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|unique:applications,name',
            'users_count' => 'required|integer|min:2|max:100',
            'api_key' => 'nullable|string|min:8|max:30',
            'tipo' => 'required|string|in:lite,standard,premium'
        ];
    }
}

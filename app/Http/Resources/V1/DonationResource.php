<?php

namespace App\Http\Resources\V1;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DonationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
          'id' => $this->id,
          'comment' => $this->comment,
          'image' => $this->image,
          'user_id' => $this->user_id,
          'amount' => $this->amount,
          'user' => User::where('id', $this->user_id)->get(),
          'created_at' => $this->created_at,
        ];
    }
}

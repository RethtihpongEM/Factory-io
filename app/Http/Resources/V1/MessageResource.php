<?php

  namespace App\Http\Resources\V1;

  use Illuminate\Http\Request;
  use Illuminate\Http\Resources\Json\JsonResource;

  class MessageResource extends JsonResource
  {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray ( Request $request ) : array
    {
      return [
        'id' => $this -> id ,
        'msg_content' => $this -> msg_content ,
        'image' => $this -> image ,
        'chat_id' => $this -> chat_id ,
        'sender_id' => $this -> sender_id ,
        'admin_id' => $this -> admin_id ,
        'created_at' => $this -> created_at ,
        'updated_at' => $this -> updated_at ,
      ];
    }
  }

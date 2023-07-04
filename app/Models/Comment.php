<?php

  namespace App\Models;

  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;

  class Comment extends Model
  {
    use HasFactory;

    protected $fillable = [
      'body' , 'comment_time' , 'user_id' , 'project_id' , 'parent_id'
    ];

    public function user ()
    {
      return $this -> belongsTo ( User::class , 'user_id' , 'id' );
    }

    public function replies ()
    {
      return $this -> hasMany ( Comment::class , 'parent_id' );
    }
  }

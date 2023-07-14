<?php

  namespace App\Models;

  // use Illuminate\Contracts\Auth\MustVerifyEmail;
  use Illuminate\Database\Eloquent\Concerns\HasUuids;
  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Relations\HasMany;
  use Illuminate\Foundation\Auth\User as Authenticatable;
  use Illuminate\Notifications\Notifiable;
  use Laravel\Sanctum\HasApiTokens;

  class Admin extends Authenticatable
  {
    use HasApiTokens , HasFactory , Notifiable;

    protected $guard = 'admin';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    use HasUuids;

    protected $fillable = [
      'firstName' ,
      'lastName' ,
      'phoneNumber' ,
      'email' ,
      'password' ,
      'bio' ,
      'pfp' ,
      'username' ,
      'gender' ,
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
      'password' ,
      'remember_token' ,
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
      'email_verified_at' => 'datetime' ,
    ];

    public function invoices () : HasMany
    {
      return $this -> hasMany ( Invoice::class );
    }
  }

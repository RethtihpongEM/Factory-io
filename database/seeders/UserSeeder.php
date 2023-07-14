<?php

  namespace Database\Seeders;

  use Illuminate\Database\Seeder;
  use Illuminate\Support\Facades\DB;

  class UserSeeder extends Seeder
  {
    /**
     * Run the database seeds.
     */
    public function run () : void
    {
      DB ::table ( 'admins' ) -> insert ( [
        'firstName' => 'Admin' ,
        'lastName' => 'Admin' ,
        'gender' => 'Male' ,
        'phoneNumber' => '012792811' ,
        'email' => 'admin@domain.com' ,
        'username' => 'admin' ,
        'password' => bcrypt ( 'admin' ) ,
        'bio' => 'Backend Dev' ,
      ] );

      DB ::table ( 'users' ) -> insert ( [
        'firstName' => 'Rethtihpong' ,
        'lastName' => 'Em' ,
        'gender' => 'Male' ,
        'phoneNumber' => '012792811' ,
        'email' => 'rithtipongem@gmail.com' ,
        'username' => 'RpongEM' ,
        'address' => 'Phnom Penh, Cambodia' ,
        'password' => bcrypt ( '1234' ) ,
        'bio' => 'Backend Dev' ,
      ] );
      DB ::table ( 'users' ) -> insert ( [
        'firstName' => 'Sunchhay' ,
        'lastName' => 'Khoun' ,
        'gender' => 'Male' ,
        'phoneNumber' => '012355162' ,
        'email' => 'sunchhay@gmail.com' ,
        'username' => 'JustChhayXP' ,
        'address' => 'Phnom Penh, Cambodia' ,
        'password' => bcrypt ( '1234' ) ,
        'bio' => 'Backend Dev' ,
      ] );
      DB ::table ( 'users' ) -> insert ( [
        'firstName' => 'Thydatepin' ,
        'lastName' => 'Sim' ,
        'gender' => 'Female' ,
        'phoneNumber' => '012355162' ,
        'email' => 'tepin@gmail.com' ,
        'username' => 'CharmZz' ,
        'address' => 'Phnom Penh, Cambodia' ,
        'password' => bcrypt ( '1234' ) ,
        'bio' => 'Frontend Dev' ,
      ] );
    }
  }

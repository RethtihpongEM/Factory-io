<?php

  namespace App\Http\Controllers\Api\V1;

  use App\Http\Controllers\Controller;
  use App\Http\Requests\ProjectRequest;
  use App\Http\Resources\V1\ProjectResource;
  use App\Models\Project;
  use Illuminate\Http\Request;
  use Illuminate\Support\Facades\Storage;

  class ProjectController extends Controller
  {
    public function index ()
    {
      return ProjectResource ::collection ( Project ::all () );
    }

    public function show ( Project $project )
    {
      return new ProjectResource( $project );
    }

    public function store ( ProjectRequest $request )
    {
      $data = $request -> validated ();
      if ( $request -> hasFile ( 'file' ) ) {
        $filename = $request -> file ( 'file' ) -> getClientOriginalName ();
        $filepath = 'projects/src/' . $filename;
        Storage ::disk ( 'projectsFile' ) -> put ( $filename , file_get_contents ( $data[ 'file' ] ) );
        $data[ 'file' ] = $filepath;
      }
      if ( $request -> hasFile ( 'image' ) ) {
        $imageFile = $request -> file ( 'image' ) -> getClientOriginalName ();
        $filepath = 'projects/img/' . $imageFile;
        Storage ::disk ( 'projectsImage' ) -> put ( $imageFile , file_get_contents ( $data[ 'image' ] ) );
        $data[ 'image' ] = $filepath;
      }
      Project ::create ( $data );
      return response () -> json ( 'Project Created' );
    }

    public function fetchLastProject ()
    {
      return Project ::latest ( 'id' ) -> first ();
    }
  }

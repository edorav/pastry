<?php

namespace App\Http\Controllers;

use App\Models\Cake;
use App\Models\Ingredient;
use Illuminate\Http\Request;
use Carbon\Carbon;

class CakeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Cake::with(['ingredients']);

        if(isset($_GET['searchField']) && $_GET['searchField'] !== '' ) {

            $data = $data->where($_GET['searchField'], 'LIKE', '%' . $_GET['searchTerm'] . '%');

        } 

        if(isset($_GET['onlyAvailable'])) {
            $data = $data->whereDate('created_at', '>', Carbon::now()->subDays(4))
                ->where('quantity', '>', 0); ;  
        }
        

        $data = $data->orderBy($_GET['sortBy'], $_GET['sortOrder'])
                ->paginate($_GET['size'], ['*'], 'page', $_GET['page']);

        $data->map(function($cake) {
            $date = Carbon::parse($cake->created_at);
            $now = Carbon::now();

            $diff = $date->diffInDays($now);
            $cake->edible = $diff < 4;
            switch ($diff) {
                case 0:
                    $portion = 100;
                    break;
                case 1:
                    $portion = 80;
                    break;
                case 2:
                    $portion = 20;
                    break;
                default:
                    $portion = 0;
                    break;
            }
            $cake->final_price = $portion * $cake->price / 100;
            return $cake;
        });
       
        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $cake = Cake::create($request->all());

            foreach($request->ingredients as $ingredient) {
                $ingredientdb = new Ingredient($ingredient);
                $ingredientdb->cake_id = $cake->id;
                $ingredientdb->save();
            }
            return response()->json($cake);
        } catch(\Exception $e){
            return abort(500, $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cake  $cake
     * @return \Illuminate\Http\Response
     */
    public function show(Cake $cake)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Cake  $cake
     * @return \Illuminate\Http\Response
     */
    public function edit(Cake $cake)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cake  $cake
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cake $cake)
    {
        try{
            $cake = Cake::find($request->input('id'));
            if ($cake) {
                $cake->fill($request->all());
                $cake->update();

                $res = Ingredient::where('cake_id',$cake->id)->delete();
                foreach($request->ingredients as $ingredient) {
                    $ingredientdb = new Ingredient($ingredient);
                    $ingredientdb->cake_id = $cake->id;
                    $ingredientdb->save();
                }
                return response()->json($cake);
            } else {
                return abort(404, 'Not Found');
            }
        } catch (\Exception $e) {
            return abort(500, $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cake  $cake
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cake $cake)
    {
        try{
            $cake = Cake::find($cake->id);
            if($cake) {
                $cake->delete();
            } else {
                return abort(404, 'Not Found');
            }
        } catch(\Exception $e){
            return abort(500, $e->getMessage());
        }
    }
}

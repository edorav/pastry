<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cake extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'price', 'quantity'
    ];

    public function ingredients() 
    {
        return $this->hasMany('App\Models\Ingredient');
    }

}

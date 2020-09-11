<?php

namespace Database\Factories;

use App\Models\Ingredient;
use App\Models\Cake;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class IngredientFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Ingredient::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $cake = Cake::inRandomOrder()->first();
        return [
            'name' => $this->faker->word,
            'unitmeasure' => $this->faker->word,
            'quantity' => $this->faker->randomFloat($nbMaxDecimals = 2, $min = 1, $max = 500),
            'cake_id' => $cake ? $cake->id : null
        ];
    }
}

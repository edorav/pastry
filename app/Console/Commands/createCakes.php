<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Cake;
use App\Models\Ingredient;
use Carbon\Carbon;

class createCakes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cake:dummy';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create cakes';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $cakes = [
            [
                'name' => 'Torta alla ricotta',
                'price' => 12,
                'quantity' => 3,
                'date' => Carbon::now()->subDays(1),
                'ingredients' => [
                    [                  
                        'name' => 'Ricotta',
                        'unitmeasure' => 'Grammi',
                        'quantity' => 500
                    ],
                    [                  
                        'name' => 'Zucchero',
                        'unitmeasure' => 'Grammi',
                        'quantity' => 300
                    ],
                    [                  
                        'name' => 'Latte',
                        'unitmeasure' => 'Litri',
                        'quantity' => 0.5
                    ]
                ]
            ],
            [
                'name' => 'Cheesecake',
                'price' => 20,
                'quantity' => 6,
                'date' => Carbon::now()->subDays(5),
                'ingredients' => [
                    [                  
                        'name' => 'Lamponi',
                        'unitmeasure' => 'Grammi',
                        'quantity' => 200
                    ],
                    [                  
                        'name' => 'Zucchero',
                        'unitmeasure' => 'Grammi',
                        'quantity' => 300
                    ],
                    [                  
                        'name' => 'Latte',
                        'unitmeasure' => 'Litri',
                        'quantity' => 0.5
                    ]
                ]
            ],
            [
                'name' => 'Torta di Mele',
                'price' => 5.50,
                'quantity' => 10,
                'date' => now(),
                'ingredients' => [
                    [                  
                        'name' => 'Mele',
                        'unitmeasure' => 'Grammi',
                        'quantity' => 800
                    ],
                    [                  
                        'name' => 'Zucchero',
                        'unitmeasure' => 'Grammi',
                        'quantity' => 300
                    ],
                    [                  
                        'name' => 'Latte',
                        'unitmeasure' => 'Litri',
                        'quantity' => 0.5
                    ]
                ]
            ],
            [
                'name' => 'Torta al cioccolato',
                'price' => 8,
                'quantity' => 1,
                'date' => Carbon::now()->subDays(2),
                'ingredients' => [
                    [                  
                        'name' => 'Cioccolato',
                        'unitmeasure' => 'Grammi',
                        'quantity' => 500
                    ],
                    [                  
                        'name' => 'Zucchero',
                        'unitmeasure' => 'Grammi',
                        'quantity' => 300
                    ],
                    [                  
                        'name' => 'Latte',
                        'unitmeasure' => 'Litri',
                        'quantity' => 0.5
                    ]
                ]
            ]
        ];
        try {
            foreach($cakes as $cake) {
                $cakedb = new Cake($cake);
                $cakedb->name = $cake['name'];
                $cakedb->price = $cake['price'];
                $cakedb->quantity = $cake['quantity'];
                
                $cakedb->save();

                $cakedb->created_at = $cake['date'];
                $cakedb->update();

                foreach($cake['ingredients'] as $ingredient) {
                    $ingredientdb = new Ingredient($ingredient);
                    $ingredientdb->cake_id = $cakedb->id;
                    $ingredientdb->save();
                }

                $this->info("Creata la torta " . $cake['name']);
            }
        } catch(\Exception $e) {
            $this->info("ERRORE CREAZIONE torta " . $cake['name'] . $e->getMessage());
        }
        return 0;
    }
}

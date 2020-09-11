## Comandi

- `php artisan migrate` per creare le tabelle nel db.
- `php artisan user:dummy` per creare gli utenti per Maria o Luana.
- `php artisan cake:dummy` per creare torte con nomi reali e scadenze in base a quanto viene eseguito questo comando.
- `php artisan db:seed` per creare i dati finti nelle tabelle (se non si vogliono usare i comandi custom precedenti).
- `cd frontend` per spostarsi nella directory del frontend e poi `npm run build` per creare il bundle del frontend e spostarlo automaticamente nella public del progetto laravel.


## Note

- Il file .env è da configurare (database)
- Il file environments di angular è da configurare (rest url da impostare)
- Le torte si intendono "preparate" nel momento in cui il record viene creato nella tabella cake del db => gli sconti sono quindi applicati in base a created_at.
- La disponibilità delle torte è intesa per lotto: esempio "se preparo tre cheesecake la loro data di preparazione è la medesima, gli sconti di conseguenza andranno di pari passo".
- La password per qualsiasi utente (ovviamente hashata nel DB) è "password". 
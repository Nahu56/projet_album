# Organisation du fichier de commandes
> CF: commandes.json

```
{
    [DATE_COMMANDE] : {
        [ID_COMMANDE_PAYPAL] : {
            nom : [NOM],                    -> string
            prenom : [PRENOM],              -> string
            email : [ADRESSE],              -> string

            nom_album : [ALBUM],            -> string
            qtt_album : [QUANTITE],         -> number
            reliure : [RELIURE],            -> string
            format : [FORMAT],              -> string
            pages : [NOMBRE],               -> number
            total : [PRIX],                 -> float

            deja_telecharge : [TELECHARGE], -> bool
            supprime : [SUPPRIME]           -> bool
        },
        [ID_COMMANDE_PAYPAL] : {
            ...
        }
    }
}
```

>Les informations entre [] sont les valeurs, les autres sont les clés.

Les commandes sont organisées par **date**, afin de pouvoir les afficher plus facilement ensuite
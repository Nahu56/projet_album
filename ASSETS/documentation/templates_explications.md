# Explication du fichier de templates
> CF: templates.json

### EXEMPLE
```
{
    "id1":{
        "obj1":{
            "type": "img",
            "data": {
                "x": "3",
                "y": "2",
                "w": "94",
                "h": "96"
            }
        }
    },

    ...

}
```
---------
### EXPLICATION
```
{
    [ID_TEMPLATE] :{
        [ID_OBJET] :{
            type : [image ou texte],
            data: {
                x : [position X de l'objet en %],
                y : [position Y de l'objet en %],
                w : [largeur l'objet en %],
                h : [hauteur X de l'objet en %]
            }
        }
    },

    ...
}
```

> Les informations entre [] sont les valeurs, les autres sont les clés.

* L'**ID template** permet de le différencier de tous les autres. Il permet d'être retrouvé facilement aussi.
    * Il est créé a partir de la chaine "id" puis d'un chiffre incrémenté
* De la même façon, l'**ID d'objet** permet de retrouver un objet au sein d'un template, il est unique au sein de ce dernier.

---

### Informations sur les objets
* Le type d'objet permet de différencier les textes des images. 
    * Les objets demandent tous une position X et Y
</br></br>
* Les images demandent en plus une largeur (W) et une hauteur (H)
    * Les textes se positionnent à partir du centre (et non du coin en haut a gauche)
        * et on une largeur définie dans le css et tjrs identique
        * les textes sont toujours centrés
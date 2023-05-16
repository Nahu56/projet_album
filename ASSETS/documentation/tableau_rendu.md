
# Tableau a récupéré en php apres achat


## Exemple

```
$tableau = [ 
    [
        'id'=>'id4',
        'obj_1'=>'TEST',
        'obj_2'=>['../assets/IMG/image.jpg','C']
    ], 
    [
        'id'=>'id2',
        'obj_1'=>['../assets/IMG/pluie.jpg','H'],
        'obj_2'=>['../assets/IMG/cover-r4x3w1000-5e1852089e8f3-moon-416973-1280.jpg','B']
    ], 
    [
        'id'=>'id1',
        'obj_1'=>['../assets/IMG/ponyo-sur-la-falaise-4595.jpg','D']
    ],
    [
        'id'=>'id1','obj_1'=>['../assets/IMG/dystalgia_ai_218_result-1400x1400.jpg','G']
    ]
];
```

### Explications 

```
$tableau = [
    [
        'id' => [id de la template],
        [id_obj] => [texte], 
        [id_obj] => [ [ lien de l'image ] , [ placement de l'image ]]
    ], 
    [
        'id' => [id de la template],
        [id_obj] => [ [ lien de l'image ] , [ placement de l'image ]], 
        [id_obj] => [ [ lien de l'image ] , [ placement de l'image ]]
    ]

];

```

- Pour chaque page on ajoute un élément dans le tableau
- Pour les objets de type texte on donne juste le texte 
- Pour les objets de type image on donne le lien de l'image et son placement dans l'élément ( Centré (C) , Gauche (G) , Droite (D) , Haut (H) , Bas (B) )
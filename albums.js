//se houver dados no localStorage ele transforma pra objeto e adiciona ao albumsJson, se não tiver dados no localStorage ele apenas adiciona o que ja tinha ali.

//Os dados que poderiam ter no localStorage são TODOS OS ALBUNS, la no script.js adicionamos todo o array albumsJson no localStorage com o novo album que o usuário adicionou por ultimo. Aí ele verifica, se esse novo array de albums existe no localStorage ele adiciona, caso não exista ele adiciona o array padrão que eu criei!
let albumsJson = JSON.parse(localStorage.getItem('albumsJson')) || [
    {id:1, name:'GNX', img:'images/disco.jpg', price:30, sizes:['CD', 'Vinyl', 'Digital'], description:'The GNX vinyl offers a unique sonic experience, with incredible details in the mix and a visually stunning album cover.'},
    {id:2, name:'My Beatiful Dark Twisted Fantasy', img:'images/disco2.jpg', price:30, sizes:['CD', 'Vinyl', 'Digital'], description:'The iconic My Beautiful Dark Twisted Fantasy vinyl comes with a luxurious presentation and a sound that amplifies its grandeur.'},
    {id:3, name:'The Forever Story', img:'images/disco3.jpg', price:30, sizes:['CD', 'Vinyl', 'Digital'], description:'The Forever Story on vinyl brings JID’s intricate flows and storytelling to life, with every track sounding even more dynamic and immersive.'},
    {id:4, name:'The Miseducation of Lauryn Hill', img:'images/disco4.jpg', price:30, sizes:['CD', 'Vinyl', 'Digital'], description:'The Miseducation of Lauryn Hill has a vinyl edition that elevates every melody and emotion, making the experience even more authentic.'},
    {id:5, name:'Mr. Morale & The Big Steppers', img:'images/disco5.jpg', price:30, sizes:['CD', 'Vinyl', 'Digital'], description:'Mr. Morale & The Big Steppers on vinyl delivers an insane depth of sound, making every beat and verse even more immersive.'},
    {id:6, name:'To Pimp a Butterfly', img:'images/disco6.jpg', price:30, sizes:['CD', 'Vinyl', 'Digital'], description:'To Pimp a Butterfly takes on a new dimension on vinyl, highlighting the jazz, funk, and poetic elements with impressive clarity.'},
    {id:7, name:'Good Kid, M.A.A.D City', img:'images/disco7.jpg', price:30, sizes:['CD', 'Vinyl', 'Digital'], description:'Good Kid, M.A.A.D City on vinyl transports the listener straight to the streets of Compton, with every track feeling even more cinematic.'},
];

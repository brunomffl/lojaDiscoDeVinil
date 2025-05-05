let modalQt = 1;
let cart = [];
let modalKey = 0;

function renderAlbums() {
    // Limpa a área para evitar duplicação
    document.querySelector('.album-area').innerHTML = '';

    albumsJson.forEach((album) => {
        let albumItem = document.querySelector('.models .album-item').cloneNode(true);
        albumItem.setAttribute('id', album.id);
        albumItem.querySelector('.album-item--name').innerHTML = album.name;
        albumItem.querySelector('.album-item--desc').innerHTML = album.description;
        // Garante que album.price seja um número; caso contrário, usa 0
        let albumPrice = Number(album.price) || 0;
        albumItem.querySelector('.album-item--price').innerHTML = `$${albumPrice.toFixed(2)}`;
        albumItem.querySelector('.album-item--img img').src = album.img;
    
        albumItem.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
    
            let id = e.target.closest('.album-item').getAttribute('id');
            let albumData = albumsJson.find(album => album.id == id);
            modalKey = albumData;
    
            document.querySelector('.albumWindowArea').style.opacity = 0;
            document.querySelector('.albumWindowArea').style.display = 'flex';
            setTimeout(() => {
                document.querySelector('.albumWindowArea').style.opacity = 1;
            }, 100);
    
            let modal = document.querySelector('.albumWindowBody');
            modal.querySelector('h1').innerHTML = albumData.name;
            modal.querySelector('.albumInfo--desc').innerHTML = albumData.description;
            modal.querySelector('.albumBig img').src = albumData.img;
            let modalPrice = Number(albumData.price) || 0;
            modal.querySelector('.albumInfo--actualPrice').innerHTML = `$${modalPrice.toFixed(2)}`;
    
            modalQt = 1;
            document.querySelector('.albumInfo--qt').innerHTML = modalQt;
    
            document.querySelectorAll('.albumInfo--size').forEach((item, index) => {
                item.classList.remove('selected');
                if (index === 2) {
                    item.classList.add('selected');
                }
                item.querySelector('span').innerHTML = albumData.sizes[index];
            });
        });
    
        document.querySelector('.album-area').append(albumItem);
    });
}

renderAlbums();

function closeModal() {
    document.querySelector('.albumWindowArea').style.opacity = 0;
    setTimeout(() => {
        document.querySelector('.albumWindowArea').style.display = 'none';
    }, 500);
}

document.querySelectorAll('.albumInfo--cancelButton, .albumInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

document.querySelector('.albumInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--;
        document.querySelector('.albumInfo--qt').innerHTML = modalQt;
    }
});

document.querySelector('.albumInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    document.querySelector('.albumInfo--qt').innerHTML = modalQt;
});

document.querySelectorAll('.albumInfo--size').forEach((item) => {
    item.addEventListener('click', () => {
        document.querySelector('.albumInfo--size.selected').classList.remove('selected');
        item.classList.add('selected');
    });
});

document.querySelector('.albumInfo--addButton').addEventListener('click', () => {
    let format = document.querySelector('.albumInfo--size.selected').getAttribute('data-key');
    let identifier = `${modalKey.id}@${format}`;

    let key = cart.findIndex((item) => item.identifier === identifier);

    if (key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id: modalKey.id,
            format,
            qt: modalQt
        });
    }
    updateCart();
    closeModal();
});

function updateCart(){
    document.querySelector('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0){
        document.querySelector('aside').classList.add('show');
        document.querySelector('.cart').innerHTML = '';

        let totalWOdiscount = 0;
        let discount = 0;
        let total = 0;
        cart.forEach((item) => {
            let albumItem = albumsJson.find((album) => album.id == item.id);
            let cartItem = document.querySelector('.models .cart--item').cloneNode(true);
            totalWOdiscount += Number(albumItem.price) * item.qt;

            let albumFormat = ['CD', 'Vinyl', 'Digital'];

            cartItem.querySelector('img').src = albumItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = `${albumItem.name} [${albumFormat[item.format]}]`;
            cartItem.querySelector('.cart--item--qt').innerHTML = item.qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(item.qt > 1){
                    item.qt--;
                } else{
                    cart = cart.filter(cartItem => cartItem.identifier !== item.identifier);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                item.qt++;
                updateCart();
            });
            
            document.querySelector('.cart').append(cartItem);

            discount = totalWOdiscount * 0.1;
            total = totalWOdiscount - discount;

            document.querySelector('.subtotal span:last-child').innerHTML = `R$ ${totalWOdiscount.toFixed(2)}`;
            document.querySelector('.desconto span:last-child').innerHTML = `R$ ${discount.toFixed(2)}`;
            document.querySelector('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
        });
    } else{
        document.querySelector('aside').classList.remove('show');
        document.querySelector('aside').style.left = '100vw';
    }
}

document.querySelector('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0){
        document.querySelector('aside').style.left = '0';
    }
});

document.querySelector('.menu-closer').addEventListener('click', () => {
    document.querySelector('aside').style.left = '100vw';
});

document.querySelector('#buttonAdd').addEventListener('click', () => {
    document.querySelector('.addalbum').style.opacity = '1';
    document.querySelector('.addalbum').style.pointerEvents = 'all';
});

document.querySelector('.confirm').addEventListener('click', () => {

    let newAlbum = {};

    let name = document.querySelector('.albumName').value;
    let price = parseFloat(document.querySelector('.price').value);
    let desc = document.querySelector('.description').value;
    let img = document.querySelector('.albumCover');

    let imageFile = img.files[0];

    if (!imageFile) {
        alert("Upload an image to continue");
        return;
    }
    
    if (isNaN(price)) {
        alert("Enter a valid price");
        return;
    }

    let reader = new FileReader();

    reader.onload = (e) => {
        newAlbum.id = albumsJson.length > 0 ? albumsJson[albumsJson.length - 1].id + 1 : 1;
        newAlbum.name = name;
        newAlbum.img = e.target.result;
        newAlbum.price = price;
        newAlbum.sizes = ['CD', 'Vinyl', 'Digital'];
        newAlbum.description = desc;

        // Adiciona o novo álbum ao array
        albumsJson.push(newAlbum);

        // Armazena o array atualizado no localStorage
        localStorage.setItem('albumsJson', JSON.stringify(albumsJson));

        // Re-renderiza os álbuns
        renderAlbums();

        setTimeout(closeAlbumModal, 2000);
    };

    reader.readAsDataURL(imageFile);
});

document.querySelector('.cancel').addEventListener('click', closeAlbumModal);

function closeAlbumModal(e){
    if(e) e.preventDefault();
    document.querySelector('.addalbum').style.pointerEvents = 'none';
    document.querySelector('.addalbum').style.opacity = '0';
}

const cardArea = document.getElementById('card-area')
const cards = []
const cardImg = {
    back: 'img/card_back.png',
    1: 'img/card_spade_01.png',
    2: 'img/card_spade_02.png',
    3: 'img/card_spade_03.png',
    4: 'img/card_spade_04.png',
    5: 'img/card_spade_05.png',
    6: 'img/card_spade_06.png',
    7: 'img/card_spade_07.png',
    8: 'img/card_spade_08.png',
    9: 'img/card_spade_09.png',
    10: 'img/card_spade_10.png',
    // 11:'card_spade_11.png',
    // 12:'card_spade_12.png',
    // 13:'card_spade_13.png'
}
let card1, card2
let stop = false
let result = false
let ansNum = 0

const CreateArray = () => {
    for (let i = 1; i <= 10; i++) {
        cards.push(i)
    }
    for (let j = 1; j <= 10; j++) {
        cards.push(j)
    }
}

const Shuffle = () => {
    for (let i = cards.length; 1 < i; i--) {
        const index = Math.floor(Math.random() * i);
        [cards[index], cards[i - 1]] = [cards[i - 1], cards[index]]
    }
}

const Anime = (ele, angle, img) => {
    while (angle <= 180) {
        ele.style.transform = `rotateY(${angle}deg)`
        angle++
        if (angle === 90) ele.src = img
    }
}


const CheckCard = () => {
    if (card1.num === card2.num) {
        card1 = null
        card2 = null
        ansNum += 2

        setTimeout(() => {
            if (ansNum >= 20) {
                alert('クリアです')
            }
        }, 300)

    } else {
        stop = true
        setTimeout(() => {
            card1.ele.removeAttribute('style')
            card2.ele.removeAttribute('style')

            card1.ele.src = cardImg.back
            card2.ele.src = cardImg.back

            card1.ele.dataset.back = true
            card2.ele.dataset.back = true

            card1 = null
            card2 = null

            stop = false
        }, 700)
    }
}

const CardClick = (e, index) => {
    if (!JSON.parse(e.target.dataset.back) || stop) return

    if (!card1) {
        e.target.dataset.back = !JSON.parse(e.target.dataset.back)
        card1 = { num: cards[index], ele: e.target }
        Anime(e.target, 0, cardImg[card1.num])
    } else {
        card2 = { num: cards[index], ele: e.target }
        Anime(e.target, 0, cardImg[card2.num])
        CheckCard()
    }


}

const CreateCard = () => {
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < cards.length; i++) {
        const div = document.createElement('div')
        div.classList.add('card')
        const img = document.createElement('img')
        img.src = cardImg.back
        img.dataset.back = true
        div.addEventListener('click', (e) => CardClick(e, i))
        div.appendChild(img)
        fragment.appendChild(div)
    }
    cardArea.appendChild(fragment)
}

const Init = () => {
    CreateArray()
    Shuffle()
    CreateCard()
}

Init()
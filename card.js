class Item {
    constructor(title, content) {
        this.title = title
        this.content = content
    }
}

class HeaderItem extends Item { }

class BodyItem extends Item { }

class Bar { }

class Card {
    constructor(canvas) {
        canvas.width = 900
        canvas.height = 500

        this.color = "#3873b3"

        this.canvas = canvas
        let ctx = canvas.getContext("2d")

        ctx.textBaseline = "top"

        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, 900, canvas.height)

        ctx.fillStyle = this.color
        ctx.fillRect(0, 0, 225, canvas.height)
        this.ctx = ctx

        this.items = []
    }

    setProfilePicture(src) {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.addEventListener("load", () => {
            this.ctx.drawImage(img, 28, 28, 225 - 28 * 2, 225 - 28 * 2)
        })
        img.src = src
    }

    addItem(item) {
        let header_count = this.items.filter(item => item instanceof HeaderItem).length
        let body_count = this.items.length - header_count

        let index = item instanceof HeaderItem ? header_count : body_count
        this.print(index, item)

        this.items.push(item)
    }

    print(index, item) {
        const HEADER_TOP = 200
        let ctx = this.ctx
        let color = this.color

        if (item instanceof HeaderItem) {
            ctx.fillStyle = "white"
            ctx.fillRect(28, 27 + HEADER_TOP + 80 * index, 5, 24)

            ctx.font = "bold 24px Apple SD Gothic Neo"
            ctx.fillText(item.title, 43, 25 + HEADER_TOP + 80 * index)

            ctx.font = "22px Apple SD Gothic Neo"
            ctx.fillText(item.content, 43, 60 + HEADER_TOP + 80 * index)
        }
        if (item instanceof BodyItem) {
            ctx.fillStyle = color
            ctx.font = "bold 24px Apple SD Gothic Neo"
            if (item.title) {
                ctx.fillRect(255, 32 + 40 * index, 5, 24)
                console.log(`${32 + 40 * index}에다가 찍음`)
                ctx.fillText(item.title, 270, 30 + 40 * index)
                console.log(`${30 + 40 * index}에다가 찍음`)
            }
            ctx.fillStyle = "black"
            ctx.font = "24px Apple SD Gothic Neo"
            ctx.fillText(item.content, 460, 30 + 40 * index)
        }
        if (item instanceof Bar) {
            ctx.fillStyle = color
            ctx.fillRect(255, 32 + 40 * index + 10, 615, 1)
        }
    }

    clear() {
        this.items = []
        let ctx = this.ctx

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, 900, this.canvas.height)

        ctx.fillStyle = this.color
        ctx.fillRect(0, 0, 225, this.canvas.height)
    }
}

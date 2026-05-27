const fileSet = {
    crew: "Spot Boys",

    prepareProps(){
        console.log(`outer 1st layer function ${this.crew}`)

        function arrangeChairs(){
            console.log(`inner 2nd layer normal function ${this.crew}`)
        }

        arrangeChairs()

        const arrangeLights = () => {
            console.log(`inner 2nd layer arrow function ${this.crew}`)
        }

        arrangeLights() 
    },

    prepareMakeUp: () =>{
        console.log(`1stlayer arrow function ${this.crew}`)
    }
}

fileSet.prepareProps()


fileSet.prepareMakeUp()
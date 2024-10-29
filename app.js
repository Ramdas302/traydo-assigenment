var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json({}));
app.post("/roman-numerals", async (req, res) => {
    try {
        var number = req.body.number;
        var roman = {
            M: 1000,
            CM: 900,
            D: 500,
            CD: 400,
            C: 100,
            XC: 90,
            L: 50,
            XL: 40,
            X: 10,
            IX: 9,
            V: 5,
            IV: 4,
            I: 1,
        };

        var roman_number = "";

        Object.keys(roman).forEach((key, index) => {
            if (number >= roman[key]) {
                if (Object.keys(roman).length === index + 1) {
                    for (i = 0; i < number; i--) {
                        roman_number = roman_number + key;
                        number = number - roman[key];
                    }
                } else {
                    roman_number = roman_number + key;
                    number = number - roman[key];
                }
            }
        })
        res.json({
            status: 200,
            data: roman_number
        })
    } catch (error) {
        console.log(error)
    }
});


app.post("/digits", async (req, res) => {
    try {
        let numbers = [
            "",
            "",
            "abc",
            "def",
            "ghi",
            "jkl",
            "mno",
            "pqrs",
            "tuv",
            "wxyz",
        ];
        var digits = req.body.digits;
        digits = digits.replace("0", "")
        digits = digits.replace("1", "")
        var arr_data = [''];
        var value1 = digits.split('');
        while (digits.length > 0) {
            let string = arr_data[0];
            if (string.length === digits.length) {
                return res.json({
                    status: 200,
                    data: arr_data
                })

            } else {
                arr_data.shift();
                let index = value1[string.length]
                let value = numbers[index];
                for (i = 0; i < value.length; i++) {
                    arr_data.push(string + value.charAt(i));
                }
            }
        }
        res.json({
            status: 200,
            data: arr_data
        })
    } catch (error) {
        console.log(error)
    }
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Connected to port " + port);
});

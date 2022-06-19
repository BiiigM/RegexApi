const Joi = require('joi');
const express = require('express');
const app = express();
const port = 3187;

app.use(express.json());

app.post('/regex/api/matchAll', (req, res) => {
    const schema = Joi.object({
        text: Joi.string().required(),
        pattern: Joi.string().required()
    });
    const isValid = schema.validate(req.body);

    if(isValid.error){
        res.status(400).send(isValid.error.details);
        return;
    }

    var str = req.body.text;
    var exp = new RegExp(req.body.pattern, 'gm');

    var response = {
        matches: []
    };

    var matches = [...str.matchAll(exp)];
    matches.forEach(x => {
        match = {
            text: x[0],
            index: x.index.toString(),
            groups: x.groups
        };
        
        response['matches'].push(match);
    });
    res.send(response);
})

app.listen(port, () => console.log(`listen to port ${port}...`));
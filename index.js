const express = require('express');
let jobList = require('./jobs.json');

const app = express();

app.use(express.static('static'));

app.get('/category', (req,res) => {
    let count = {};

    for (j in jobList) {
        for (x of jobList[j].categories) {
            if (x in count) {
                count[x]++;
            }
            else {
                count[x] = 1;
            }
        }
    }

    res.json(count);
});

app.get('/:jobcategory', (req,res) => {
    let job = [];

    for (j in jobList) {
        for (x in jobList[j].categories) {
            if (req.params.jobcategory == jobList[j].categories) {
                job.push(j);
            }
        }
    }

    res.send(job);
});

app.get('/jobcity', (req,res) => {
    let job = [];

    for (j in jobList) {
        if (jobList[j].title.includes(req.query.city)) {
            job.push(j);
        }
    }

    res.send(job);
});

app.listen(80);
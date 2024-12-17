#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const current = (argv) => {
    const date = new Date();

    if (argv.d) {
       console.log(date.getDate())
    } else if (argv.m) {
        console.log(date.getMonth() + 1)
    } else if (argv.y) {
        console.log(date.getFullYear())
    } else {
        console.log(date)
    }
};

const add = (argv) => {
    console.log(getChangeDate(argv, 1));
};

const sub = (argv) => {
    console.log(getChangeDate(argv, -1));
};

const getChangeDate = (argv, character) => {
    const date = new Date();

    if (argv.d) {
        date.setDate(date.getDate() + argv.d*character)
    } else if (argv.m) {
        date.setMonth(date.getMonth() + argv.m*character)
    } else if (argv.y) {
        date.setFullYear(date.getFullYear() + argv.y*character)
    }
    return date;
};

const optionsCurrent = (yargs) => {
    return yargs
        .option('date', {
            alias: 'd',
            type: 'bolean',
            description: 'current Date'
        })
        .option('month', {
            alias: 'm',
            type: 'bolean',
            description: 'current Month'
        })
        .option('year', {
            alias: 'y',
            type: 'bolean',
            description: 'current Year'
        })
};

const optionsAddSub = (yargs) => {
    return yargs
        .option('date', {
            alias: 'd',
            type: 'number',
            nargs: 1,
            description: 'add date'
        })
        .option('month', {
            alias: 'm',
            type: 'number',
            nargs: 1,
            description: 'add month'
        })
        .option('year', {
            alias: 'y',
            type: 'number',
            nargs: 1,
            description: 'add year'
        })
};

const argv = yargs(hideBin(process.argv))
    .command(
        'current',
        'current date',
        optionsCurrent,
        current
    )
    .command(
        'add',
        'date add',
        optionsAddSub,
        add
    )
    .command(
        'sub',
        'date sub',
        optionsAddSub,
        sub
    )
    .demandCommand(1, 'Please specify a command')
    .strict()
    .help()
    .argv;
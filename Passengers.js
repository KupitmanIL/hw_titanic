import fs from 'node:fs';

fs.readFile('./train.csv', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    const arr = data.trim().split('\n');

    const passengers = arr.slice(1).map(line => {
        const values = line.trim().split(',');

        if (values[3].startsWith('"')) {
            values[3] = values[3] + ',' + values[4];
            values.splice(4, 1);
        }

        return {
            survived: Number(values[1]),
            pclass: Number(values[2]),
            name: values[3],
            sex: values[4],
            age: values[5] ? Number(values[5]) : null,
            fare: Number(values[9])
        };
    });

    const totalFare = passengers.reduce((sum, passenger) => sum + passenger.fare, 0);
    console.log('Total fare:', totalFare);

    for (let i = 1; i <= 3; i++) {
        const classPassengers = passengers.filter(passenger => passenger.pclass === i);
        const classTotalFare = classPassengers.reduce((sum, passenger) => sum + passenger.fare, 0);
        const classAverageFare = classTotalFare / classPassengers.length;

        console.log(`Average fare class ${i}:`, classAverageFare);
    }

    const survivedPassengers = passengers.filter(passenger => passenger.survived === 1).length;
    const notSurvivedPassengers = passengers.filter(passenger => passenger.survived === 0).length;

    console.log('Survived passengers:', survivedPassengers);
    console.log('Not survived passengers:', notSurvivedPassengers);

    const survivedMen = passengers.filter(passenger =>
        passenger.sex === 'male' &&
        (passenger.age === null || passenger.age >= 18) &&
        passenger.survived === 1).length;

    const notSurvivedMen = passengers.filter(passenger =>
        passenger.sex === 'male' &&
        (passenger.age === null || passenger.age >= 18) &&
        passenger.survived === 0).length;

    const survivedWomen = passengers.filter(passenger =>
        passenger.sex === 'female' &&
        (passenger.age === null || passenger.age >= 18) &&
        passenger.survived === 1).length;

    const notSurvivedWomen = passengers.filter(passenger =>
        passenger.sex === 'female' &&
        (passenger.age === null || passenger.age >= 18) &&
        passenger.survived === 0).length;

    const survivedChildren = passengers.filter(passenger =>
        passenger.age !== null &&
        passenger.age < 18 &&
        passenger.survived === 1).length;

    const notSurvivedChildren = passengers.filter(passenger =>
        passenger.age !== null &&
        passenger.age < 18 &&
        passenger.survived === 0).length;

    console.log('Survived men:', survivedMen);
    console.log('Not survived men:', notSurvivedMen);

    console.log('Survived women:', survivedWomen);
    console.log('Not survived women:', notSurvivedWomen);

    console.log('Survived children:', survivedChildren);
    console.log('Not survived children:', notSurvivedChildren);
});
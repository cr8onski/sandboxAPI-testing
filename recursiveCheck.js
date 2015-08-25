var apples = ['golden', 'granny', 'delicious', 'winesap', 'fuji', 'macintosh'],
    oranges = ['naval', 'mandarin', 'valencia', 'blood'],
    berries = ['straw', 'blue', 'rasp', 'huckle', 'black'],
    countout = 0,
    countmiddle = 0,
    countin = 0,
    apps = apples.length,
    ors = oranges.length,
    bers = berries.length;

function demApples(i) {
    if (i === apps) {
        return console.log('I have all the apples ' + countout);
    }
    countout++;
    function dosOranges(j) {
        if (j === ors) {
            return console.log('I have all the oranges' + countmiddle);
        }
        countmiddle++;
        function daBerries(k) {
            if (k === bers) {
                return console.log('I have all the berries' + countin);
            }
            countin++;
            console.log('\t\t' + berries[k]);
            daBerries(k + 1);
        }
        console.log('\t' + oranges[j]);
        daBerries(0);
        dosOranges(j + 1);
    }
    console.log(apples[i]);
    dosOranges(0);
    demApples(i + 1);
    // dosOranges(0);
} demApples(0);

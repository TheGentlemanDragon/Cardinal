function StandardBenchmark(toMeasure,repeatTimes){
    if(typeof(repeatTimes) != "number"){
        repeatTimes = 1;
    }

    if(typeof(toMeasure) === "function"){
        var start_status = performance.now();
        var total_taken = 0;
        for(var i = 0;i < repeatTimes;i++){
            var startTimeSubtask = performance.now();
            toMeasure.call();
            var endTimeSubtask = performance.now();
            total_taken += (endTimeSubtask -startTimeSubtask);
        }
        var final_status = performance.now();
    }

    return {
        totalMilliseconds: (final_status - start_status),
        averageMillisecondsPerTask: total_taken / repeatTimes
    };
}


var testStr = `
alsh laskfj la;sijdf la;skdh f;lasjdf a;osijdf lsajdf laskjd f;lasjd f;lkjas
dfljas dlfkja sdl;ifj asldk;fj ovihz vlkqaj woiuv a;slnvz;oxivu aj v;lawu wf
asdf klxv poiw adlvihsa dlkasdj fow ea fajsd fijzxvlk alw;jo zcvj wa;li ;lwi
as ldjw eoin z;licv asjlk;r uowe9 ;sldkj cf;aso9 j s;dfua9w f l;aku fa ;lkjs
`

function byIncludes() {
    return testStr.includes('fow');
}

function byIndexOf() {
    return testStr.indexOf('fow');
}

function bySearch() {
    return testStr.search('fow');
}

StandardBenchmark(byIncludes, 10000);
StandardBenchmark(byIndexOf, 10000);
StandardBenchmark(bySearch, 10000);

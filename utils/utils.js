export function getDateString(date, gubun)
{
    var sYear = date.getFullYear();
    var sMonth = date.getMonth() + 1;
    var sDate = date.getDate();

    sMonth = sMonth > 9 ? sMonth : "0" + sMonth;
    sDate  = sDate > 9 ? sDate : "0" + sDate;
    return sYear + gubun + sMonth + gubun + sDate;
}

export function stringDateFormat(string){
    const date = string.slice(0, 10).split('-');
    return `${date[0]}년 ${date[1]}월 ${date[2]}일`
}
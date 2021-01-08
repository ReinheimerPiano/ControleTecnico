export default {
    intlDateFormat(date, typeDate, typeTime){
        // debugger;
        if (!date) return null;
        return new Intl.DateTimeFormat('pt-BR', {
            dateStyle: typeDate,
            timeStyle: typeTime
        }).format(new Date(date));
    },
    dateToIsoFormat(date, hasMiliseconds){
        if (!date) return null;
        if (hasMiliseconds)
            return date.toISOString();
        else
            return date.toISOString().split('.')[0];
    }
}
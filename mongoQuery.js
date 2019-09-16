db.recorridos2019.aggregate( [ {
    $project: {
        bici_date:{
        $let:{
            vars:{
                fecha: {$dateFromString: {
                    dateString: '$bici_fecha_hora_retiro',
                    timezone: 'UTC'
                 }
            }},
            in:{
              year: {$year:"$$fecha"},
              month: {$month:"$$fecha"},
              day: {$dayOfMonth: "$$fecha"},
              hour: {$hour: "$$fecha"},
              weekDay: {$dayOfWeek: "$$fecha"},
              isWeekend: {$in:[{$dayOfWeek:"$$fecha"},[1,7]]}
            }
        }}
    }},
     {$match: { "bici_date.isWeekend": true }}
    ] )

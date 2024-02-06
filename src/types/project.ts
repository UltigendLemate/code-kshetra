export type Project = {
    overview?: string,
    big_brands : string[],
    database_schema : {
        category : string,
        properties : string[]
    }[],
    industry_trends : {
        india : string,
        us_europe : string
    },
    pain_points_of_user : string[],
    required_features : string[],
    target_audience : string,
    website_ui : {
        color_pallete : string[][],
        typography : string[]
    }
    suggested_names? : string[],
    app_icons? : string[],
    web_designs? : string[],
     


}
export type Project = {
    overview?: string,
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
    target_audience : string[],
    website_ui : {
        color_pallete : string[][],
        typography : string[]
    }
    suggested_names? : string[],
    app_icons? : string[],
    web_designs? : string[],
    swot_analysis? : {
		strengths : string[],
		weaknesses: string[],
		opportunities: string[],
		threats : string[],		
		},

	measures_for_corporate_social_responsibility? : string[],
    carbon_fp_reasons? : string[],
    sustainable_measures_to_reduce_carbon_footprints?: string[],
	competitor_analysis? : {
        name : string,
		"USP": string,
        "pricing_strategy": string,
        "promotion_strategy": string,
        "product_strategy": string,
        "user_complaints" : string,
        "shortcomings": string,
        "user_praises": string
	}[]
}


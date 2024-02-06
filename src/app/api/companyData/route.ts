

async function company() {
    method: 'GET',
  url: 'https://crunchbase-crunchbase-v1.p.rapidapi.com/autocompletes',
  params: {
    query: company
  },
  headers: {
    'X-RapidAPI-Key': 'a3835b4601msh07385b4c457c6aap1ea124jsn40908cd5786c',
    'X-RapidAPI-Host': 'crunchbase-crunchbase-v1.p.rapidapi.com'
  }
}

export async function POST(req: Request) {
    const { company } = (await req.json()) as { company: string };
    try {
        const response = await axios.request(options);
        console.log(response.data);
        return new Response(JSON.stringify({ response.data }), { status: 200 });
    } catch (error) {
        console.error(error);
    }
}
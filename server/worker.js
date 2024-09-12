export default {
	/**
	 * @param {Request} request
	 * @param {Env} env
	 * @param {ExecutionContext} ctx
	 * @returns {Promise<Response>}
	 */
	async fetch(request, env, ctx) {
		if (request.method !== 'POST') {
		  return new Response('Only POST requests are allowed', { status: 405 })
		}
	  
		let body;
		try {
		  body = await request.json()
		} catch (e) {
		  return new Response('Invalid JSON in request body', { status: 400 })
		}
	  
		const { url, headers = {} } = body
	  
		if (!url) {
		  return new Response(JSON.stringify({ error: "URL is missing from the request body" }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		  })
		}
	  
		try {
		  const response = await fetch(url, { headers })
		  const content = await response.text()
	  
		  return new Response(JSON.stringify({ ok: response.ok, content }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		  })
		} catch (error) {
		  return new Response(JSON.stringify({ ok: false, content: `Request failed: ${error.message}` }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		  })
		}
	  }
};
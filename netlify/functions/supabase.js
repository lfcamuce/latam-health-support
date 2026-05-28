const SUPABASE_URL = 'https://xbaixzkygchvzjhnxryu.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiYWl4emt5Z2NodnpqaG54cnl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5OTAwMjgsImV4cCI6MjA5NTU2NjAyOH0.uyv0XAbOBvd5NojyjDO6mZfk1xtYQgu3E8w0B5xsVLw';

exports.handler = async (event) => {
  const path = event.path.replace('/.netlify/functions/supabase', '');
  const url = SUPABASE_URL + '/rest/v1' + path + (event.rawQuery ? '?' + event.rawQuery : '');

  const headers = {
    'apikey': ANON_KEY,
    'Authorization': 'Bearer ' + ANON_KEY,
    'Content-Type': 'application/json',
    'Prefer': event.headers['prefer'] || ''
  };

  const response = await fetch(url, {
    method: event.httpMethod,
    headers,
    body: ['POST', 'PUT', 'PATCH'].includes(event.httpMethod) ? event.body : undefined
  });

  const body = await response.text();

  return {
    statusCode: response.status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    body
  };
};

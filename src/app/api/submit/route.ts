import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL
  if (!scriptUrl) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }

  const body = await req.json()
  const { username, wallet, tasks, refBy } = body

  if (!username || !wallet) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const payload = {
    username: username.replace(/^@/, '').trim(),
    wallet: wallet.trim(),
    follow: tasks?.follow ? 'YES' : 'NO',
    quote: tasks?.quote ? 'YES' : 'NO',
    tag: tasks?.tag ? 'YES' : 'NO',
    refBy: refBy || '',
    timestamp: new Date().toISOString(),
  }

  const res = await fetch(scriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to write to sheet' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}

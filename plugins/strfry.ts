#!/usr/bin/env node
import readline from 'readline';
import fetch from 'node-fetch';

interface Event {
  id: string;
  pubkey: string;
  content: string;
  tags: string[][];
  [key: string]: any;
}

interface PluginRequest {
  event: Event;
  ip?: string;
}

interface AnalyzeResponse {
  event_id: string;
  status: 'SAFE' | 'WARNING' | 'HARMFUL';
  labels: string[];
  reason: string;
}

interface PluginResponse {
  id: string;
  action: 'accept' | 'reject';
  msg?: string;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const API_URL = '{BASE_URL}/analyze'; // Replace with your API endpoint

rl.on('line', async (line) => {
  try {
    const req: PluginRequest = JSON.parse(line);
    const event = req.event;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const result: AnalyzeResponse = await response.json();
    const action: 'accept' | 'reject' = result.status === 'SAFE' ? 'accept' : 'reject';

    const pluginResponse: PluginResponse = {
      id: result.event_id,
      action,
      msg: action === 'reject' ? `Blocked: ${result.status}` : undefined
    };

    console.log(JSON.stringify(pluginResponse));
  } catch (error) {
    const fallbackResponse: PluginResponse = {
      id: '',
      action: 'reject',
      msg: 'Internal error'
    };
    console.log(JSON.stringify(fallbackResponse));
  }
});

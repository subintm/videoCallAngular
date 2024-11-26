import { Injectable, computed, signal } from '@angular/core';
import { Call, StreamVideoClient, User } from '@stream-io/video-client';

@Injectable({
  providedIn: 'root',
})
export class CallingService {
  callId = signal<string | undefined>(undefined);

  call = computed<Call | undefined>(() => {
    const currentCallId = this.callId();
    if (currentCallId !== undefined) {
      const call = this.client.call('default', currentCallId);

      call.join({ create: true }).then(async () => {
        call.camera.enable();
        call.microphone.enable();
      });
      return call;
    } else {
      return undefined;
    }
  });

  client: StreamVideoClient;

  constructor() {
   
const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0NhbGxpc3RhX01pbmciLCJ1c2VyX2lkIjoiQ2FsbGlzdGFfTWluZyIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzMyNTk1MzQ1LCJleHAiOjE3MzMyMDAxNDV9.bPDlzv5gwYAQPKJbn5QqrZX3N5B8WWgk42pEZ2x853U';
const user: User = { id: 'Callista_Ming' };
    this.client = new StreamVideoClient({ apiKey, token, user });
  }

  setCallId(callId: string | undefined) {
    if (callId === undefined) {
      this.call()?.leave();
    }
    this.callId.set(callId);
  }
}

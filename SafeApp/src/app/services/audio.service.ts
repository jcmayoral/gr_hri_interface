import { Injectable } from '@angular/core';

interface Sound {
  key: string;
  asset: string;
  isNative: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private sounds: Sound[] = [];
  private _player: HTMLAudioElement = new Audio();
  isPlaying = false;
  isLoading = false;

  constructor(){
    this._player.muted=false;
  }

  preload(key: string, asset: string): void {
    console.log("preload")
    let audio = new Audio();
    audio.src = asset;
    this.sounds.push({
      key: key,
      asset: asset,
      isNative: false
    });
  }

  play(key: string): void {
    let soundToPlay = this.sounds.find((sound) => {
      return sound.key === key;
    });

    console.log("a")
    console.log("c", soundToPlay.asset)
    this._player.src = soundToPlay.asset;
    this._player.play();
  }
}
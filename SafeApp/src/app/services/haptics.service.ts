import { Injectable } from '@angular/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

@Injectable({
  providedIn: 'root'
})


export class HapticsService {
  hapticsImpactMedium = async () => {
    Haptics.notification( {type: NotificationType.Error })
    await Haptics.impact({ style: ImpactStyle.Medium });
  };

  hapticsImpactHeavy = async () => {
    Haptics.notification( {type: NotificationType.Error });
    await Haptics.impact({ style: ImpactStyle.Heavy });
  };
  
  hapticsImpactLight = async () => {
    Haptics.notification( {type: NotificationType.Error })
    await Haptics.impact({ style: ImpactStyle.Light });
  };
  
  hapticsVibrate = async () => {
    Haptics.notification( {type: NotificationType.Error })
    await Haptics.vibrate();
  };
  
  hapticsSelectionStart = async () => {
    await Haptics.selectionStart();
  };
  
  hapticsSelectionChanged = async () => {
    await Haptics.selectionChanged();
  };
  
  hapticsSelectionEnd = async () => {
    await Haptics.selectionEnd();
  };
  

  constructor() { }
}

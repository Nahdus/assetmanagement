import { Component } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  schedule=[];
  constructor(
    private plt:Platform,
    private locanotification:LocalNotifications,
    private alertCtrl:AlertController) {
      this.plt.ready().then(()=>{
        this.locanotification.on('click').subscribe(res=>{
          let msg = res.data?res.data.mydata:'';
          console.log('click : '+res)
          this.showAlert(res.title,res.text,msg)
        })
        this.locanotification.on('trigger').subscribe(res=>{
          let msg = res.data?res.data.mydata:'';
          console.log('trigger : '+res)
          this.showAlert(res.title,res.text,msg)
        })
      })
    }

  scheduleNotification(){
    this.locanotification.schedule({
      id:1,
      title:'attention',
      text:'simons notification',
      data:{mydata:'My hidden message is this'},
      trigger:{in:5,unit:ELocalNotificationTriggerUnit.SECOND},
      foreground:true
    })
  }

  recurringNotification(){
    this.locanotification.schedule({
      id:2,
      title:'recurring',
      text:'simons recurring notification',
      data:{mydata:'My hidden message is this'},
      trigger:{every: ELocalNotificationTriggerUnit.MINUTE},
      foreground:true
    })
  }

  repatingDaily(){
    this.locanotification.schedule({
      id:2,
      title:'Good Morning',
      text:'Code something epic today',
      data:{mydata:'My hidden message is this'},
      trigger:{every: {hour:11,minute:49}},
      foreground:true
    })
  }

  getAll(){
    this.locanotification.getAll().then(
      res=>{
        console.log(res)
        this.schedule=res
      }
    )
  }



  showAlert(header,sub,msg){
    this.alertCtrl.create({
      header:header,
      subHeader:sub,
      message:msg,
      buttons:['Ok']
    }).then(alert=>alert.present())
  }

}

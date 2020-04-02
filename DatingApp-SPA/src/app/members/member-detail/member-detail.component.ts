import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { GalleryComponent, GalleryItem, ImageItem, GALLERY_CONFIG } from '@ngx-gallery/core';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})

export class MemberDetailComponent implements OnInit {
  @ViewChild(GalleryComponent) gallery: GalleryComponent;
  @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent;
  user: User;
  images: GalleryItem[] = [];

  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });

    this.route.queryParams.subscribe(params => {
      const selectedTab = params.tab;
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    });

    this.getImages();
  }

  getImages() {
    for (const photo of this.user.photos) {
      const image = new ImageItem({ src: photo.url, thumb: photo.url });
      this.images.push(image);
    }
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }
}

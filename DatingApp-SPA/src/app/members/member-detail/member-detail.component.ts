import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { GalleryComponent, GalleryItem, ImageItem, GALLERY_CONFIG } from '@ngx-gallery/core';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})

export class MemberDetailComponent implements OnInit {
  user: User;
  images: GalleryItem[] = [];
  @ViewChild(GalleryComponent) gallery: GalleryComponent;

  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
    this.getImages();
  }

  getImages() {
    for (const photo of this.user.photos) {
      const image = new ImageItem({ src: photo.url, thumb: photo.url });
      this.images.push(image);
    }
  }
}

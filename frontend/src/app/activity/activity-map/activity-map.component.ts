import { Component, Input, OnInit } from '@angular/core'
import L from 'leaflet'
//import '../assets/geolocation/leaflet.css'
import 'leaflet-gpx'
import { HttpClient } from '@angular/common/http'
import { ActivityService } from '../activity.service'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { Activity } from '../model/activity'

@Component({
    selector: 'app-activity-map',
    standalone: true,
    imports: [],
    templateUrl: './activity-map.component.html',
    styleUrl: './activity-map.component.scss',
})
export class ActivityMapComponent implements OnInit {
    map!: L.Map
    gpxData: any

    @Input()
    activity!: Activity

    private routeSub: Subscription = new Subscription()
    constructor(private http: HttpClient, private activityService: ActivityService, private route: ActivatedRoute) {}

    ngOnInit() {
        if (typeof window !== 'undefined') {
            this.map = L.map('map')
            this.createMap()
            this.loadFile()
        }
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe()
    }

    createMap() {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 100,
            attribution: '&copy; OpenStreetMap',
        }).addTo(this.map)
    }

    async loadFile() {
        if (this.activity.gpx_file !== undefined && this.activity.gpx_file !== null) {
            let existingActivity = await this.activityService.getActivityById(this.activity.id_activity)

            new L.GPX(existingActivity.gpx_file, {
                async: true,
                polyline_options: {
                    color: 'red',
                },
                marker_options: {
                    startIconUrl: '/assets/geolocation/marker-icon.png',
                    endIconUrl: '/assets/geolocation/marker-icon.png',
                    shadowUrl: '/assets/geolocation/marker-shadow.png',
                },
            })
                .on('loaded', (e) => {
                    const gpxObject = e.target
                    this.map.fitBounds(gpxObject.getBounds())
                })
                .addTo(this.map)
        }
    }
}

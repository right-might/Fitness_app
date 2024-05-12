import { TestBed } from '@angular/core/testing'
import { LanguageService } from './language.service'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

describe('LanguageService', () => {
    let service: LanguageService

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot()],
            providers: [],
        }).compileComponents()
        service = TestBed.inject(LanguageService)
        providers: [TranslateService]
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})

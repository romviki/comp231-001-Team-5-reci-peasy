import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { RecipeService } from 'src/app/services/recipe.service';

interface SearchItem {
  id: string;
  name: string;
  img: string;
  description: string;
}
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  recipes$!: Observable<SearchItem[]>;
  selectedRecipe?: SearchItem;
  private input$ = new BehaviorSubject<string>('');
  @ViewChild('searchBar') private searchBar!: ElementRef;

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit() {
    this.recipes$ = this.input$.pipe(
      mergeMap((searchTerm) => {
        if (searchTerm) {
          return this.recipeService.getRecipes().pipe(
            map((recipes) => {
              return recipes
                .map((recipe) => {
                  return {
                    id: recipe.id,
                    name: recipe.metaData.name,
                    img: recipe.metaData.img,
                    description: recipe.metaData.description,
                  };
                })
                .filter((item) =>
                  item.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            })
          );
        }
        return of([]);
      })
    );
  }

  emitInput(searchTerm: string) {
    this.input$.next(searchTerm);
  }

  async navigateToRecipeDetail(event: any) {
    await this.router.navigate(['/recipe', event.item.id]);
    this.searchBar.nativeElement.value = '';
  }
}

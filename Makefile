DATE ?= $(shell date +%F)
POSTS := src/content/posts
FILE  := $(POSTS)/$(DATE)-$(n).md

.PHONY: new dev

# 使い方: make new n=resnet            -> src/content/posts/今日の日付-resnet.md
#         make new n=vit DATE=2026-11-20 （日付を指定したいとき）
new:
	@test -n "$(n)" || { echo "名前を指定してね: make new n=resnet"; exit 1; }
	@test ! -e "$(FILE)" || { echo "もうある: $(FILE)"; exit 1; }
	@sed 's/^date: .*/date: $(DATE)/' templates/note.md > "$(FILE)"
	@echo "作った: $(FILE)"

dev:
	npm run dev

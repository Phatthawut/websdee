<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">
          {{ isEditing ? "Edit Article" : "Create New Article" }}
        </h1>
        <p class="text-gray-600">
          {{
            isEditing
              ? "Update your article content"
              : "Write and publish your new article"
          }}
        </p>
      </div>
      <router-link
        to="/admin/articles"
        class="inline-flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <svg
          class="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Back to Articles
      </router-link>
    </div>

    <form @submit.prevent="saveArticle" class="space-y-6">
      <!-- Article Form -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 space-y-6">
          <!-- Title -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Title (English) *
              </label>
              <input
                v-model="article.title.en"
                type="text"
                required
                placeholder="Enter article title in English"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Title (Thai)
              </label>
              <input
                v-model="article.title.th"
                type="text"
                placeholder="Enter article title in Thai"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <!-- Slug -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              URL Slug *
            </label>
            <input
              v-model="article.slug"
              type="text"
              required
              placeholder="article-url-slug"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p class="text-sm text-gray-500 mt-1">
              URL-friendly version of the title. Will be auto-generated if left
              empty.
            </p>
          </div>

          <!-- Excerpt -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Excerpt (English) *
              </label>
              <textarea
                v-model="article.excerpt.en"
                rows="3"
                required
                placeholder="Brief description of the article in English"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Excerpt (Thai)
              </label>
              <textarea
                v-model="article.excerpt.th"
                rows="3"
                placeholder="Brief description of the article in Thai"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>

          <!-- Category and Status -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                v-model="article.category"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Category</option>
                <option value="web-development">Web Development</option>
                <option value="design">Design</option>
                <option value="seo">SEO</option>
                <option value="business">Business</option>
                <option value="technology">Technology</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                v-model="article.status"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Featured Image
              </label>
              <div class="space-y-3">
                <!-- Current Image Preview -->
                <div v-if="article.image" class="relative">
                  <img
                    :src="article.image"
                    alt="Featured image preview"
                    class="w-full h-32 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    @click="removeImage"
                    class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    title="Remove image"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>

                <!-- Image Selection Buttons -->
                <div class="flex gap-2">
                  <button
                    type="button"
                    @click="showUnsplashPicker = true"
                    class="flex-1 inline-flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <svg
                      class="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Choose from Unsplash
                  </button>
                </div>

                <!-- Manual URL Input -->
                <div>
                  <input
                    v-model="article.image"
                    type="url"
                    placeholder="Or paste image URL here..."
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <!-- Image Attribution -->
                <div v-if="imageAttribution" class="text-xs text-gray-500">
                  <span v-html="imageAttribution"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Editor -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Content</h3>

          <!-- English Content -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Content (English) *
            </label>
            <div class="border border-gray-300 rounded-lg overflow-hidden">
              <!-- Toolbar -->
              <div
                v-if="editorEn"
                class="border-b border-gray-200 p-2 bg-gray-50"
              >
                <div class="flex flex-wrap items-center gap-1">
                  <!-- Text Formatting -->
                  <button
                    type="button"
                    @click="editorEn.chain().focus().toggleBold().run()"
                    :class="{
                      'bg-blue-100 text-blue-600': editorEn.isActive('bold'),
                    }"
                    class="p-2 rounded hover:bg-gray-200 transition-colors"
                    title="Bold"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M4 4v12h4.5c2.48 0 4.5-2.02 4.5-4.5 0-1.08-.38-2.07-1.02-2.84C12.62 8.1 13 7.16 13 6c0-2.21-1.79-4-4-4H4zm3 2h2c.55 0 1 .45 1 1s-.45 1-1 1H7V6zm0 4h2.5c.83 0 1.5.67 1.5 1.5S10.33 13 9.5 13H7v-3z"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    @click="editorEn.chain().focus().toggleItalic().run()"
                    :class="{
                      'bg-blue-100 text-blue-600': editorEn.isActive('italic'),
                    }"
                    class="p-2 rounded hover:bg-gray-200 transition-colors"
                    title="Italic"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M8 4v2h2.5l-2 8H6v2h6v-2h-2.5l2-8H14V4H8z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    @click="editorEn.chain().focus().toggleUnderline().run()"
                    :class="{
                      'bg-blue-100 text-blue-600':
                        editorEn.isActive('underline'),
                    }"
                    class="p-2 rounded hover:bg-gray-200 transition-colors"
                    title="Underline"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M6 2v8c0 2.21 1.79 4 4 4s4-1.79 4-4V2h-2v8c0 1.1-.9 2-2 2s-2-.9-2-2V2H6zm-2 16h12v2H4v-2z"
                      />
                    </svg>
                  </button>

                  <div class="w-px h-6 bg-gray-300 mx-1"></div>

                  <!-- Headings -->
                  <button
                    type="button"
                    @click="
                      editorEn.chain().focus().toggleHeading({ level: 1 }).run()
                    "
                    :class="{
                      'bg-blue-100 text-blue-600': editorEn.isActive(
                        'heading',
                        { level: 1 }
                      ),
                    }"
                    class="px-3 py-1 rounded hover:bg-gray-200 transition-colors text-sm font-medium"
                    title="Heading 1"
                  >
                    H1
                  </button>

                  <button
                    type="button"
                    @click="
                      editorEn.chain().focus().toggleHeading({ level: 2 }).run()
                    "
                    :class="{
                      'bg-blue-100 text-blue-600': editorEn.isActive(
                        'heading',
                        { level: 2 }
                      ),
                    }"
                    class="px-3 py-1 rounded hover:bg-gray-200 transition-colors text-sm font-medium"
                    title="Heading 2"
                  >
                    H2
                  </button>

                  <button
                    type="button"
                    @click="
                      editorEn.chain().focus().toggleHeading({ level: 3 }).run()
                    "
                    :class="{
                      'bg-blue-100 text-blue-600': editorEn.isActive(
                        'heading',
                        { level: 3 }
                      ),
                    }"
                    class="px-3 py-1 rounded hover:bg-gray-200 transition-colors text-sm font-medium"
                    title="Heading 3"
                  >
                    H3
                  </button>

                  <div class="w-px h-6 bg-gray-300 mx-1"></div>

                  <!-- Lists -->
                  <button
                    type="button"
                    @click="editorEn.chain().focus().toggleBulletList().run()"
                    :class="{
                      'bg-blue-100 text-blue-600':
                        editorEn.isActive('bulletList'),
                    }"
                    class="p-2 rounded hover:bg-gray-200 transition-colors"
                    title="Bullet List"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    @click="editorEn.chain().focus().toggleOrderedList().run()"
                    :class="{
                      'bg-blue-100 text-blue-600':
                        editorEn.isActive('orderedList'),
                    }"
                    class="p-2 rounded hover:bg-gray-200 transition-colors"
                    title="Numbered List"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M3 4h1v1H3V4zm2 0h14v1H5V4zM3 8h1v1H3V8zm2 0h14v1H5V8zm-2 4h1v1H3v-1zm2 0h14v1H5v-1z"
                      />
                    </svg>
                  </button>

                  <div class="w-px h-6 bg-gray-300 mx-1"></div>

                  <!-- Link -->
                  <button
                    type="button"
                    @click="addLink(editorEn)"
                    :class="{
                      'bg-blue-100 text-blue-600': editorEn.isActive('link'),
                    }"
                    class="p-2 rounded hover:bg-gray-200 transition-colors"
                    title="Add Link"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      />
                    </svg>
                  </button>

                  <!-- Blockquote -->
                  <button
                    type="button"
                    @click="editorEn.chain().focus().toggleBlockquote().run()"
                    :class="{
                      'bg-blue-100 text-blue-600':
                        editorEn.isActive('blockquote'),
                    }"
                    class="p-2 rounded hover:bg-gray-200 transition-colors"
                    title="Quote"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Editor Content -->
              <div
                class="prose prose-sm max-w-none p-4 min-h-[300px] focus-within:outline-none"
              >
                <editor-content :editor="editorEn" />
              </div>
            </div>
            <p class="text-sm text-gray-500 mt-1">
              Rich text editor for your English content. Use the toolbar to
              format text.
            </p>
          </div>

          <!-- Thai Content -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Content (Thai)
            </label>
            <div class="border border-gray-300 rounded-lg overflow-hidden">
              <!-- Toolbar -->
              <div
                v-if="editorTh"
                class="border-b border-gray-200 p-2 bg-gray-50"
              >
                <div class="flex flex-wrap items-center gap-1">
                  <!-- Text Formatting -->
                  <button
                    type="button"
                    @click="editorTh.chain().focus().toggleBold().run()"
                    :class="{
                      'bg-blue-100 text-blue-600': editorTh.isActive('bold'),
                    }"
                    class="p-2 rounded hover:bg-gray-200 transition-colors"
                    title="Bold"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M4 4v12h4.5c2.48 0 4.5-2.02 4.5-4.5 0-1.08-.38-2.07-1.02-2.84C12.62 8.1 13 7.16 13 6c0-2.21-1.79-4-4-4H4zm3 2h2c.55 0 1 .45 1 1s-.45 1-1 1H7V6zm0 4h2.5c.83 0 1.5.67 1.5 1.5S10.33 13 9.5 13H7v-3z"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    @click="editorTh.chain().focus().toggleItalic().run()"
                    :class="{
                      'bg-blue-100 text-blue-600': editorTh.isActive('italic'),
                    }"
                    class="p-2 rounded hover:bg-gray-200 transition-colors"
                    title="Italic"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M8 4v2h2.5l-2 8H6v2h6v-2h-2.5l2-8H14V4H8z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    @click="editorTh.chain().focus().toggleUnderline().run()"
                    :class="{
                      'bg-blue-100 text-blue-600':
                        editorTh.isActive('underline'),
                    }"
                    class="p-2 rounded hover:bg-gray-200 transition-colors"
                    title="Underline"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M6 2v8c0 2.21 1.79 4 4 4s4-1.79 4-4V2h-2v8c0 1.1-.9 2-2 2s-2-.9-2-2V2H6zm-2 16h12v2H4v-2z"
                      />
                    </svg>
                  </button>

                  <div class="w-px h-6 bg-gray-300 mx-1"></div>

                  <!-- Headings -->
                  <button
                    type="button"
                    @click="
                      editorTh.chain().focus().toggleHeading({ level: 1 }).run()
                    "
                    :class="{
                      'bg-blue-100 text-blue-600': editorTh.isActive(
                        'heading',
                        { level: 1 }
                      ),
                    }"
                    class="px-3 py-1 rounded hover:bg-gray-200 transition-colors text-sm font-medium"
                    title="Heading 1"
                  >
                    H1
                  </button>

                  <button
                    type="button"
                    @click="
                      editorTh.chain().focus().toggleHeading({ level: 2 }).run()
                    "
                    :class="{
                      'bg-blue-100 text-blue-600': editorTh.isActive(
                        'heading',
                        { level: 2 }
                      ),
                    }"
                    class="px-3 py-1 rounded hover:bg-gray-200 transition-colors text-sm font-medium"
                    title="Heading 2"
                  >
                    H2
                  </button>

                  <button
                    type="button"
                    @click="
                      editorTh.chain().focus().toggleHeading({ level: 3 }).run()
                    "
                    :class="{
                      'bg-blue-100 text-blue-600': editorTh.isActive(
                        'heading',
                        { level: 3 }
                      ),
                    }"
                    class="px-3 py-1 rounded hover:bg-gray-200 transition-colors text-sm font-medium"
                    title="Heading 3"
                  >
                    H3
                  </button>

                  <div class="w-px h-6 bg-gray-300 mx-1"></div>

                  <!-- Lists -->
                  <button
                    type="button"
                    @click="editorTh.chain().focus().toggleBulletList().run()"
                    :class="{
                      'bg-blue-100 text-blue-600':
                        editorTh.isActive('bulletList'),
                    }"
                    class="p-2 rounded hover:bg-gray-200 transition-colors"
                    title="Bullet List"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    @click="editorTh.chain().focus().toggleOrderedList().run()"
                    :class="{
                      'bg-blue-100 text-blue-600':
                        editorTh.isActive('orderedList'),
                    }"
                    class="p-2 rounded hover:bg-gray-200 transition-colors"
                    title="Numbered List"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M3 4h1v1H3V4zm2 0h14v1H5V4zM3 8h1v1H3V8zm2 0h14v1H5V8zm-2 4h1v1H3v-1zm2 0h14v1H5v-1z"
                      />
                    </svg>
                  </button>

                  <div class="w-px h-6 bg-gray-300 mx-1"></div>

                  <!-- Link -->
                  <button
                    type="button"
                    @click="addLink(editorTh)"
                    :class="{
                      'bg-blue-100 text-blue-600': editorTh.isActive('link'),
                    }"
                    class="p-2 rounded hover:bg-gray-200 transition-colors"
                    title="Add Link"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      />
                    </svg>
                  </button>

                  <!-- Blockquote -->
                  <button
                    type="button"
                    @click="editorTh.chain().focus().toggleBlockquote().run()"
                    :class="{
                      'bg-blue-100 text-blue-600':
                        editorTh.isActive('blockquote'),
                    }"
                    class="p-2 rounded hover:bg-gray-200 transition-colors"
                    title="Quote"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Editor Content -->
              <div
                class="prose prose-sm max-w-none p-4 min-h-[300px] focus-within:outline-none"
              >
                <editor-content :editor="editorTh" />
              </div>
            </div>
            <p class="text-sm text-gray-500 mt-1">
              Rich text editor for your Thai content. Use the toolbar to format
              text.
            </p>
          </div>
        </div>
      </div>

      <!-- SEO Settings -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Meta Title (English)
              </label>
              <input
                v-model="article.metaTitle.en"
                type="text"
                placeholder="SEO-optimized title for search engines"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Meta Title (Thai)
              </label>
              <input
                v-model="article.metaTitle.th"
                type="text"
                placeholder="SEO-optimized title for search engines in Thai"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Meta Description (English)
              </label>
              <textarea
                v-model="article.metaDescription.en"
                rows="3"
                placeholder="Brief description for search engine results"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Meta Description (Thai)
              </label>
              <textarea
                v-model="article.metaDescription.th"
                rows="3"
                placeholder="Brief description for search engine results in Thai"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Tags Section -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Article Tags</h3>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              v-model="tagsInput"
              type="text"
              placeholder="Enter tags separated by commas (e.g., web development, SEO, design)"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              @input="updateTags"
            />
            <p class="text-sm text-gray-500 mt-1">
              Separate tags with commas. Tags help users find related articles.
            </p>

            <!-- Tags Preview -->
            <div v-if="article.tags && article.tags.length > 0" class="mt-3">
              <p class="text-sm font-medium text-gray-700 mb-2">
                Tags Preview:
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in article.tags"
                  :key="tag"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  #{{ tag }}
                  <button
                    type="button"
                    @click="removeTag(tag)"
                    class="ml-1 hover:text-blue-600"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div
        class="flex items-center justify-between bg-white rounded-lg shadow p-6"
      >
        <div class="flex items-center space-x-4">
          <button
            type="button"
            @click="saveDraft"
            :disabled="saving"
            class="inline-flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {{ saving ? "Saving..." : "Save Draft" }}
          </button>
        </div>

        <div class="flex items-center space-x-4">
          <router-link
            to="/admin/articles"
            class="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Cancel
          </router-link>
          <button
            type="submit"
            :disabled="saving"
            class="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {{
              saving
                ? "Saving..."
                : isEditing
                ? "Update Article"
                : "Create Article"
            }}
          </button>
        </div>
      </div>
    </form>

    <!-- Unsplash Image Picker Modal -->
    <UnsplashImagePicker
      :is-open="showUnsplashPicker"
      @close="showUnsplashPicker = false"
      @select="onImageSelected"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  doc,
  getDoc,
  addDoc,
  updateDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/services/firebase.js";
import { useAuthStore } from "@/stores/authStore.js";

// TipTap imports
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import UnsplashImagePicker from "@/components/UnsplashImagePicker.vue";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const saving = ref(false);
const tagsInput = ref("");
const showUnsplashPicker = ref(false);
const imageAttribution = ref("");
const article = ref({
  title: { en: "", th: "" },
  slug: "",
  excerpt: { en: "", th: "" },
  content: { en: "", th: "" },
  metaTitle: { en: "", th: "" },
  metaDescription: { en: "", th: "" },
  category: "",
  status: "draft",
  image: "",
  tags: [],
  author: {
    uid: authStore.user?.uid,
    name: authStore.user?.displayName,
    email: authStore.user?.email,
  },
  imageAttribution: "",
  unsplashId: "",
});

// TipTap Editors
const editorEn = useEditor({
  content: article.value.content.en,
  extensions: [
    StarterKit,
    Link.configure({
      openOnClick: false,
    }),
    Underline,
    TextStyle,
    Color,
  ],
  onUpdate: ({ editor }) => {
    article.value.content.en = editor.getHTML();
  },
  editorProps: {
    attributes: {
      class:
        "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px]",
    },
  },
});

const editorTh = useEditor({
  content: article.value.content.th,
  extensions: [
    StarterKit,
    Link.configure({
      openOnClick: false,
    }),
    Underline,
    TextStyle,
    Color,
  ],
  onUpdate: ({ editor }) => {
    article.value.content.th = editor.getHTML();
  },
  editorProps: {
    attributes: {
      class:
        "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px]",
    },
  },
});

const isEditing = computed(() => Boolean(route.params.id));

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const addLink = (editor) => {
  const url = window.prompt("Enter URL:");
  if (url) {
    editor.chain().focus().setLink({ href: url }).run();
  }
};

// Tags management functions
const updateTags = () => {
  const tags = tagsInput.value
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag.length > 0);
  article.value.tags = [...new Set(tags)]; // Remove duplicates
};

const removeTag = (tagToRemove) => {
  article.value.tags = article.value.tags.filter((tag) => tag !== tagToRemove);
  // Update the input field to reflect the change
  tagsInput.value = article.value.tags.join(", ");
};

// Image handling functions
const removeImage = () => {
  article.value.image = "";
  article.value.imageAttribution = "";
  article.value.unsplashId = "";
  imageAttribution.value = "";
};

const onImageSelected = (selectedImage) => {
  article.value.image = selectedImage.url;
  article.value.imageAttribution = selectedImage.attributionHtml;
  article.value.unsplashId = selectedImage.unsplashId;
  imageAttribution.value = selectedImage.attributionHtml;
};

const loadArticle = async () => {
  if (!isEditing.value) return;

  try {
    const docRef = doc(db, "articles", route.params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      article.value = { ...article.value, ...data };

      // Update tags input
      if (data.tags && Array.isArray(data.tags)) {
        tagsInput.value = data.tags.join(", ");
      }

      // Update image attribution
      if (data.imageAttribution) {
        imageAttribution.value = data.imageAttribution;
      }

      // Update editor content
      if (editorEn.value) {
        editorEn.value.commands.setContent(data.content?.en || "");
      }
      if (editorTh.value) {
        editorTh.value.commands.setContent(data.content?.th || "");
      }
    } else {
      alert("Article not found");
      router.push("/admin/articles");
    }
  } catch (error) {
    console.error("Error loading article:", error);
    alert("Failed to load article");
  }
};

const saveDraft = async () => {
  article.value.status = "draft";
  await saveArticle();
};

const saveArticle = async () => {
  try {
    saving.value = true;

    // Generate slug if empty
    if (!article.value.slug && article.value.title.en) {
      article.value.slug = generateSlug(article.value.title.en);
    }

    // Set meta title and description if empty
    if (!article.value.metaTitle.en && article.value.title.en) {
      article.value.metaTitle.en = article.value.title.en;
    }
    if (!article.value.metaDescription.en && article.value.excerpt.en) {
      article.value.metaDescription.en = article.value.excerpt.en;
    }

    const articleData = {
      ...article.value,
      updatedAt: serverTimestamp(),
      author: {
        uid: authStore.user?.uid,
        name: authStore.user?.displayName,
        email: authStore.user?.email,
      },
    };

    if (isEditing.value) {
      // Update existing article
      const docRef = doc(db, "articles", route.params.id);
      await updateDoc(docRef, articleData);
      alert("Article updated successfully!");
    } else {
      // Create new article
      articleData.createdAt = serverTimestamp();
      await addDoc(collection(db, "articles"), articleData);
      alert("Article created successfully!");
    }

    router.push("/admin/articles");
  } catch (error) {
    console.error("Error saving article:", error);
    alert("Failed to save article. Please try again.");
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  loadArticle();
});

onBeforeUnmount(() => {
  if (editorEn.value) {
    editorEn.value.destroy();
  }
  if (editorTh.value) {
    editorTh.value.destroy();
  }
});
</script>

<style scoped>
/* TipTap Editor Styles */
.ProseMirror {
  outline: none;
  padding: 1rem;
  min-height: 200px;
}

.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3,
.ProseMirror h4,
.ProseMirror h5,
.ProseMirror h6 {
  line-height: 1.1;
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  text-wrap: pretty;
}

.ProseMirror h1,
.ProseMirror h2 {
  margin-top: 3.5rem;
  margin-bottom: 1.5rem;
}

.ProseMirror h1 {
  font-size: 1.4rem;
}

.ProseMirror h2 {
  font-size: 1.2rem;
}

.ProseMirror h3,
.ProseMirror h4,
.ProseMirror h5,
.ProseMirror h6 {
  font-size: 1.1rem;
}

.ProseMirror code {
  background-color: #f3f4f6;
  border-radius: 0.375rem;
  color: #1f2937;
  font-size: 0.875rem;
  padding: 0.125rem 0.25rem;
}

.ProseMirror pre {
  background: #0f172a;
  border-radius: 0.5rem;
  color: #e2e8f0;
  font-family: "JetBrainsMono", monospace;
  margin: 1.5rem 0;
  padding: 0.75rem 1rem;
}

.ProseMirror pre code {
  background: none;
  color: inherit;
  font-size: 0.8rem;
  padding: 0;
}

.ProseMirror blockquote {
  border-left: 3px solid #e5e7eb;
  margin: 1.5rem 0;
  padding-left: 1rem;
}

.ProseMirror hr {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 2rem 0;
}
</style>

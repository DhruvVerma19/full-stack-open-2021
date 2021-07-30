describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Super User',
      username: 'root',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in').click()
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('root')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Super User logged in')

      cy.get('.notification')
        .should('contain', 'Welcome Super User')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('root')
      cy.get('#password').type('wrongpassword')
      cy.get('#lgnbtn').click()


    })
  })


  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'root',
        password: 'password',
      }).then((response) => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function () {
      cy.contains('Create Blog').click()
      cy.get('#title').type('Title')
      cy.get('#author').type('Dhruv Verma')
      cy.get('#url').type('http://fiction.com')
      cy.get('#likes').type(2)
      cy.get('#create-blog').click()

      cy.contains('Title')
    })

    describe('and a blog exist', function () {
      beforeEach(function () {
        const body = {
          title: 'Title',
          author: 'Dhruv Verma',
          url: 'http://fiction.com',
          likes: 1,
        }
        cy.createBlog(body)
      })

      it('user like a blog', function () {
        cy.contains('view').click()
        cy.get('.like-blog').click()
      })

      it('user who created the blog can delete it', function () {
        cy.contains('view').click()
        cy.get('.remove-blog').click()
        cy.on('windows:confirm', () => true)
      })

      describe('add a few more blogs', function () {
        beforeEach(function () {
          const first_blog = {
            title: 'Title',
            author: 'Dhruv Verma',
            url: 'http://fiction.com',
            likes: 1,
          }
          const second_blog = {
            title: 'Title',
            author: 'Dhruv Verma',
            url: 'http://fiction.com',
            likes: 1,
          }
          const third_blog = {
            title: 'Title',
            author: 'Dhruv Verma',
            url: 'http://fiction.com',
            likes: 3,
          }
          cy.createBlog(first_blog)
          cy.createBlog(second_blog)
          cy.createBlog(third_blog)
        })

        it('and the first blog has maximum likes', function () {
          cy.contains('view').click()
          cy.get('.like').parent().as('likeblock')
          cy.get('@likeblock').contains(3)
        })
      })
    })
  })
})
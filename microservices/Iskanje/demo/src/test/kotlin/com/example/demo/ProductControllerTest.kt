package com.example.demo

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@ExtendWith(SpringExtension::class)
@WebMvcTest(ProductController::class)
class ProductControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockBean
    private lateinit var productRepository: ProductRepository

    @Test
    fun `test getAllProducts endpoint`() {
        mockMvc.perform(get("/products"))
            .andExpect(status().isOk)
    }

    @Test
    fun `test searchProducts endpoint`() {
        mockMvc.perform(get("/products/name/sladoled"))
            .andExpect(status().isOk)
    }
}

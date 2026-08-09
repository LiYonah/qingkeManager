# ==================== 轻客管家 Dockerfile ====================
# 多阶段构建：
#   阶段1：编译前端（Vue3 + Vite）→ dist
#   阶段2：编译后端（Spring Boot + Maven，JDK 21）→ jar（含前端静态资源）
#   阶段3：运行（JRE 21）
# 构建：docker compose build  /  docker build -t qingke-manager .

# ---- 阶段1：构建前端 ----
FROM node:22-alpine AS frontend
WORKDIR /web
COPY qingke-web/package*.json ./
RUN npm ci
COPY qingke-web/ ./
RUN npm run build

# ---- 阶段2：构建后端 ----
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
# 将前端构建产物放入 Spring Boot 静态资源目录（仅镜像内生效，不影响本地源码）
COPY --from=frontend /web/dist ./src/main/resources/static
RUN apk add --no-cache maven && mvn clean package -DskipTests

# ---- 阶段3：运行 ----
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
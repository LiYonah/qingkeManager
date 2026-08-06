# ==================== 轻客管家 Dockerfile ====================
# 多阶段构建：第一阶段编译，第二阶段运行（镜像更小）

# ---- 第一阶段：构建 ----
FROM eclipse-temurin:25-jdk-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
# 使用 Maven Wrapper 或者直接装 maven
RUN apk add --no-cache maven && mvn clean package -DskipTests

# ---- 第二阶段：运行 ----
FROM eclipse-temurin:25-jre-alpine
WORKDIR /app
# 从构建阶段复制 jar
COPY --from=builder /app/target/*.jar app.jar
# 暴露端口
EXPOSE 8080
# 启动
ENTRYPOINT ["java", "-jar", "app.jar"]
